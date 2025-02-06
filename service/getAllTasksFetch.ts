import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

const TASKS_STORAGE_KEY = "@tasks";

async function loadTasksFromStorage(): Promise<Task[]> {
  try {
    const savedTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
    return savedTasks ? JSON.parse(savedTasks) : [];
  } catch (error) {
    console.error("Erro ao carregar tarefas do AsyncStorage:", error);
    return [];
  }
}

async function saveTasksToStorage(tasks: Task[]): Promise<void> {
  try {
    await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Erro ao salvar tarefas no AsyncStorage:", error);
  }
}

async function syncTasks(): Promise<Task[]> {
  const savedTasks = await loadTasksFromStorage();

  if (savedTasks.length === 0) {
    const apiTasks = await fetchAllTasks();
    await saveTasksToStorage(apiTasks);
    return apiTasks;
  }
  return savedTasks;
}

async function fetchAllTasks(): Promise<Task[]> {
  const response = await axios.get<Task[]>(
    "https://jsonplaceholder.typicode.com/todos?_limit=5"
  );
  return response.data;
}

export function tasksFetch() {
  return useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: syncTasks,
  });
}

export function useTaskMutations() {
  const queryClient = useQueryClient();

  const addTaskMutation = useMutation<Task, Error, Task>({
    mutationFn: async (newTask: Task) => {
      const currentTasks = queryClient.getQueryData<Task[]>(["tasks"]) || [];
      const updatedTasks = [...currentTasks, newTask];
      await saveTasksToStorage(updatedTasks);
      return newTask;
    },
    onSuccess: (newTask) => {
      queryClient.setQueryData(["tasks"], (oldTasks: Task[] = []) => [
        ...oldTasks,
        newTask,
      ]);
    },
  });

  const deleteTaskMutation = useMutation<string, Error, string>({
    mutationFn: async (taskId: string) => {
      const currentTasks = queryClient.getQueryData<Task[]>(["tasks"]) || [];
      const updatedTasks = currentTasks.filter((task) => task.id !== taskId);
      await saveTasksToStorage(updatedTasks);
      return taskId;
    },
    onSuccess: (taskId) => {
      queryClient.setQueryData(["tasks"], (oldTasks: Task[] = []) =>
        oldTasks.filter((task) => task.id !== taskId)
      );
    },
  });

  const toggleTaskMutation = useMutation<string, Error, string>({
    mutationFn: async (taskId) => {
      const currentTasks = queryClient.getQueryData<Task[]>(["tasks"]) || [];
      const updatedTasks = currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      await saveTasksToStorage(updatedTasks);
      return taskId;
    },
    onSuccess: (taskId) => {
      queryClient.setQueryData(["tasks"], (oldTasks: Task[] = []) =>
        oldTasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      );
    },
  });

  return { addTaskMutation, deleteTaskMutation, toggleTaskMutation };
}
