import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  taskCardContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#D7DDE9",
    borderStyle: "dashed",
    padding: 16,
    borderRadius: 8,
  },
  taskCardButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  taskCardText: {
    flex: 1,
  },
});
