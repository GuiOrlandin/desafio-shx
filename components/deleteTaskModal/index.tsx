import { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";

import { Feather } from "@expo/vector-icons";

import { styles } from "../deleteTaskModal/styles";

interface AddTaskProps {
  deleteFunction: () => void;
}

export function DeleteTaskModal({ deleteFunction }: AddTaskProps) {
  const [modalVisible, setModalVisible] = useState(false);

  function closeModal() {
    setModalVisible(false);
  }

  function handleDelete() {
    deleteFunction();

    closeModal();
  }

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalViewText}>Deseja deletar a tarefa?</Text>
            <View style={styles.buttonContainer}>
              <Pressable style={styles.deleteButton} onPress={handleDelete}>
                <Text style={styles.buttonText}>Deletar</Text>
              </Pressable>
              <Pressable style={styles.cancelButton} onPress={closeModal}>
                <Text style={styles.buttonCancelText}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable onPress={() => setModalVisible(true)}>
        <Feather name="trash" size={20} />
      </Pressable>
    </View>
  );
}
