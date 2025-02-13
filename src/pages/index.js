import { useState, useEffect } from "react";
import { Input, Button, Checkbox, message } from "antd";

export default function Home() {
  const [token, setToken] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    budget_from: "",
    budget_to: "",
    deadline: "",
    reminds: "",
    all_auto_responses: false,
  });

  // Загружаем токен из localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("apiToken");
    if (savedToken) setToken(savedToken);
  }, []);

  // Функция для обновления данных формы
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  // Функция отправки данных
  const handleSubmit = async () => {
    if (!token) {
      message.error("Введите API токен!");
      return;
    }

    try {
      const response = await fetch(
          `https://deadlinetaskbot.productlove.ru/api/v1/tasks/client/newhardtask?token=${token}`,
      {
        method: "POST",
            headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );

      if (response.ok) {
        message.success("Задача опубликована!");
      } else {
        message.error("Ошибка при отправке задачи!");
      }
    } catch (error) {
      message.error("Ошибка сети!");
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
          <h2 className="text-xl font-semibold mb-6">Создание задачи</h2>

          <Input
              placeholder="API Token"
              value={token}
              onChange={(e) => {
                setToken(e.target.value);
                localStorage.setItem("apiToken", e.target.value);
              }}
              className="mb-[1.5rem]"
          />

          <Input
              placeholder="Название задачи"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mb-[1.5rem]"
          />

          <Input.TextArea
              placeholder="Описание"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mb-[1.5rem]"
          />

          <Input
              placeholder="Теги (через запятую)"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="mb-[1.5rem]"
          />

          <Input
              placeholder="Бюджет от"
              name="budget_from"
              type="number"
              value={formData.budget_from}
              onChange={handleChange}
              className="mb-[1.5rem]"
          />

          <Input
              placeholder="Бюджет до"
              name="budget_to"
              type="number"
              value={formData.budget_to}
              onChange={handleChange}
              className="mb-[1.5rem]"
          />

          <Input
              placeholder="Дедлайн (в днях)"
              name="deadline"
              type="number"
              value={formData.deadline}
              onChange={handleChange}
              className="mb-[1.5rem]"
          />

          <Input
              placeholder="Напоминания"
              name="reminds"
              type="number"
              value={formData.reminds}
              onChange={handleChange}
              className="mb-[1.5rem]"
          />

          <div className="mb-12">
            <Checkbox
                checked={formData.all_auto_responses}
                onChange={handleChange}
                name="all_auto_responses"
                className="block w-full"
            >
              <span style={{ color: "rgb(0,0,0)" }}>Автоматические ответы</span>
            </Checkbox>
          </div>

          <Button
              type="primary"
              onClick={handleSubmit}
              className="w-full"
              style={{
                backgroundColor: "rgb(35,149,232)",
                borderColor: "rgb(135, 206, 250)",
                color: "white",
              }}
          >
            Отправить задачу
          </Button>
        </div>
      </div>
  );



}
