import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Checkbox } from "react-native-paper";

import { styles } from "./styles";
import { DeleteTaskModal } from "../deleteTaskModal";
import { Task } from "@/service/getAllTasksFetch";
import { useTaskMutations } from "@/service/getAllTasksFetch";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const { deleteTaskMutation, toggleTaskMutation } = useTaskMutations();

  function handleDeleteTask(taskId: string) {
    deleteTaskMutation.mutate(taskId);
  }
  function handleToggleTaskConfirm(taskId: string) {
    toggleTaskMutation.mutate(taskId);
  }

  return (
    <TouchableOpacity
      onPress={() => handleToggleTaskConfirm(task.id)}
      activeOpacity={0.7}
    >
      <View style={styles.taskCardContainer}>
        <Text style={styles.taskCardText}>{task.title}</Text>

        <View style={styles.taskCardButtonsContainer}>
          <Checkbox
            status={task.completed ? "checked" : "unchecked"}
            color="rgb(7,150,211)"
          />

          <DeleteTaskModal deleteFunction={() => handleDeleteTask(task.id)} />
        </View>
      </View>
    </TouchableOpacity>
  );
}
