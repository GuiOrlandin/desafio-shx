import { TaskCard } from "@/components/taskCard";
import { Colors } from "@/constants/Colors";
import { tasksFetch, useTaskMutations } from "@/service/getAllTasksFetch";
import { useState } from "react";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { styles } from "../styles";
import { ActivityIndicator } from "react-native-paper";

export default function HomeScreen() {
  const { data, isSuccess, isLoading, isError } = tasksFetch();
  const [taskName, setTaskName] = useState<string>("");
  const { addTaskMutation } = useTaskMutations();

  function HandleAddTask() {
    if (taskName.trim()) {
      const newTask = {
        id: uuidv4(),
        title: taskName,
        completed: false,
      };
      addTaskMutation.mutate(newTask);
      setTaskName("");
    }
  }

  function getGreeting() {
    const hours = new Date().getHours();

    if (hours >= 5 && hours < 12) {
      return "Bom dia ☀️";
    } else if (hours >= 12 && hours < 18) {
      return "Boa tarde 🌤️";
    } else {
      return "Boa noite 🌙";
    }
  }

  function getTodayDate() {
    return format(new Date(), "EEEE, 'dia' d 'de' MMMM 'de' yyyy", {
      locale: ptBR,
    });
  }

  if (isError) {
    return <Text>Erro ao carregar tarefas.</Text>;
  }

  return (
    <View style={styles.homeContainer}>
      <Text style={styles.greetingText}>{getGreeting()}</Text>
      <Text style={styles.dateText}>{getTodayDate()}</Text>

      <View style={styles.addTaskContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma nova tarefa..."
          placeholderTextColor={Colors.dark.placeholder}
          value={taskName}
          onChangeText={(text) => setTaskName(text)}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => HandleAddTask()}
        >
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Tarefas</Text>

      {isLoading && !isSuccess ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.dark.primary} />
        </View>
      ) : (
        <FlatList
          data={data}
          contentContainerStyle={{ gap: 12 }}
          renderItem={({ item }) => <TaskCard task={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
}
