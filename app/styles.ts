import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    padding: 24,
  },
  dateText: {
    fontSize: 16,
    color: Colors.dark.subtitle,
    marginBottom: 12,
  },
  addTaskContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 24,
  },
  dateAndGreetingContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    gap: 8,
    marginBottom: 24,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    borderRadius: 8,
    padding: 12,
    color: Colors.dark.text,
    backgroundColor: Colors.dark.background,
  },
  addButton: {
    backgroundColor: Colors.dark.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: Colors.dark.buttonText,
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.dark.title,
    marginBottom: 12,
  },
  greetingText: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.dark.text,
    marginBottom: 8,
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
