import { useState } from "react";
import { useInputAtom } from "./inputAtom";

export const DisplayText = () => {
  const { todoValue, setTodoValue } = useInputAtom();
  const [filter, setFilter] = useState<"all" | "completed" | "uncompleted">(
    "all",
  );
  const [titleKeyword, setTitleKeyword] = useState("");
  const [descriptionKeyword, setDescriptionKeyword] = useState("");

  const total = todoValue.length;
  const completed = todoValue.filter((todo) => todo.isCompleted).length;
  const uncompleted = total - completed;

  const filteredTodos = todoValue
    .filter((todo) => {
      if (filter === "completed") return todo.isCompleted;
      if (filter === "uncompleted") return !todo.isCompleted;
      return true;
    })
    .filter((todo) => todo.title.includes(titleKeyword))
    .filter((todo) => todo.description.includes(descriptionKeyword));

  const todoCompleted = (id: string) => {
    const newTodos = todoValue.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
    );
    setTodoValue(newTodos);
  };

  const deleteTodo = (id: string) => {
    const target = todoValue.find((todo) => todo.id === id);
    if (!target) return;

    if (!target.isCompleted && !confirm("未完了のタスクを削除しますか？")) {
      return;
    }

    const newTodos = todoValue.filter((todo) => todo.id !== id);
    setTodoValue(newTodos);
  };

  return (
    <div className="space-y-2 border-t-2 pt-4 w-full max-w-4xl">
      <div className="flex gap-2 mb-4 border-slate-500 rounded border-2 p-2 justify-center  text-lg font-bold">
        <span>完了: {completed}</span>
        <span>未完了: {uncompleted}</span>
        <span>合計: {total}</span>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <select
          className="p-2 border-2 border-slate-500 rounded"
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value as "all" | "completed" | "uncompleted")
          }
        >
          <option value="all">すべてのToDo</option>
          <option value="completed">完了したToDo</option>
          <option value="uncompleted">未完了のToDo</option>
        </select>
        <input
          className="p-2 border-2 border-slate-500 rounded"
          type="text"
          placeholder="ToDo名検索"
          value={titleKeyword}
          onChange={(e) => setTitleKeyword(e.target.value)}
        ></input>
        <input
          className="p-2 border-2 border-slate-500 rounded"
          type="text"
          placeholder="説明検索"
          value={descriptionKeyword}
          onChange={(e) => setDescriptionKeyword(e.target.value)}
        ></input>
      </div>
      {filteredTodos.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center gap-2 border-b pb-2 flex-nowrap"
        >
          <div className="flex-1">
            <h2 className="text-2xl text-sky-700 font-bold">
              {todo.isCompleted ? <s>{todo.title}</s> : todo.title}
            </h2>
            {todo.description && (
              <details className="text-gray-500">
                <summary>説明</summary>
                <p>{todo.description}</p>
              </details>
            )}
            <h2>
              <span className="text-gray-500">締切: {todo.endDate}</span>
            </h2>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              type="button"
              onClick={() => todoCompleted(todo.id)}
              className={`px-2 py-1 text-white rounded ${todo.isCompleted ? "bg-yellow-500" : "bg-green-500"}`}
            >
              {todo.isCompleted ? "未完了にする" : "完了にする"}
            </button>
            <button
              type="button"
              onClick={() => deleteTodo(todo.id)}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              削除する
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
