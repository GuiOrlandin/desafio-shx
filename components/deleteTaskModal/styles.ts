import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalViewText: {
    fontSize: 24,
    marginBottom: 12,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 8,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: Colors.gray,
    borderRadius: 5,
    marginRight: 10,
    alignItems: "center",
  },
  deleteButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: Colors.red,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  buttonCancelText: {
    color: "black",
    fontSize: 16,
  },
});
