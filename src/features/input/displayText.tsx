import { useInputAtom } from "./inputAtom";

export const DisplayText = () => {
  const { todoValue, setTodoValue } = useInputAtom();

  const total = todoValue.length;
  const completed = todoValue.filter((todo) => todo.isCompleted).length;
  const uncompleted = total - completed;

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
      <div className="flex gap-2 mb-4">
        <span>合計: {total}</span>
        <span>完了: {completed}</span>
        <span>未完了: {uncompleted}</span>
      </div>
      {todoValue.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center gap-2 border-b pb-2 flex-nowrap"
        >
          <div className="flex-1">
            <h2 className="text-2xl text-sky-700 font-bold">{todo.title}</h2>
            <details className="text-gray-500">
              <summary>説明</summary>
              <p>{todo.description}</p>
            </details>
            <h2>
              <span className="text-gray-500">締切: {todo.endDate}</span>
              <span className="text-gray-500">
                {todo.isCompleted ? "✓ 完了" : "未完了"}
              </span>
            </h2>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              type="button"
              onClick={() => todoCompleted(todo.id)}
              className="px-2 py-1 bg-blue-500 text-white rounded"
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
