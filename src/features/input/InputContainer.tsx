import { useInputAtom } from "./inputAtom";

export const InputContainer = () => {
  const { setTodoValue } = useInputAtom();

  const onSubmit = (data: FormData) => {
    const formData = Object.fromEntries(data.entries());
    const title = formData.title as string;

    if (title === "" || title.trim() === "") {
      return;
    }

    if (formData.description === ""){
      formData.description = "なし";
    }

    // 締切日のフォーマットをYYYY-MM-DDに変換
    const rawEndDate = formData.endDate as string;
    const endDate = rawEndDate ? new Date(rawEndDate).toISOString().slice(0, 10): "";


    if (formData.endDate === ""){
      formData.endDate = "なし";
    }

    setTodoValue((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: formData.title as string,
        description: formData.description as string,
        endDate: endDate,
        isCompleted: false,
      },
    ]);
  };

  return (
    <form className="flex gap-4" action={onSubmit}>
      <input
        name="title"
        type="text"
        className="p-2 border-2 border-slate-500 rounded"
      />
      <textarea
        name="description"
        className="p-2 border-2 border-slate-500 rounded"
        rows={4}
      >
      </textarea>
      <input
        name="endDate"
        type="date"
        className="p-2 border-2 border-slate-500 rounded"
      ></input>
      <button
        type="submit"
        className="px-4 py-2 bg-slate-700 text-white rounded"
      >
        Submit
      </button>
    </form>
  );
};
