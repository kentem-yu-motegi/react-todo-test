import { useAtomValue, useSetAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// localStorage に保存される atom
const todoAtom = atomWithStorage<Todo[]>("todos", []);

type Todo = {
  id: string;
  title: string;
  description: string;
  endDate: string;
  isCompleted: boolean;
};
// 値とセット関数を返すカスタムフック
export const useInputAtom = () => {
  const todoValue = useAtomValue(todoAtom);
  const setTodoValue = useSetAtom(todoAtom);

  return { todoValue, setTodoValue };
};
