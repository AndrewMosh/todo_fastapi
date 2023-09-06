from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Замените это на актуальный URL вашего клиентского приложения
    allow_credentials=True,
    allow_methods=["*"],  # Разрешить все HTTP методы
    allow_headers=["*"],  # Разрешить все HTTP заголовки
)
class TodoItem(BaseModel):
    title: str
    description: str

# Dummy data to store TODO items
todos = []

@app.post("/todos/", response_model=TodoItem)
async def create_todo(todo: TodoItem):
    todos.append(todo)
    return todo

@app.get("/todos/", response_model=List[TodoItem])
async def read_todos():
    return todos

@app.get("/todos/{todo_id}", response_model=TodoItem)
async def read_todo(todo_id: int):
    if 0 <= todo_id < len(todos):
        return todos[todo_id]
    else:
        raise HTTPException(status_code=404, detail="Todo not found")

@app.put("/todos/{todo_id}", response_model=TodoItem)
async def update_todo(todo_id: int, updated_todo: TodoItem):
    if 0 <= todo_id < len(todos):
        todos[todo_id] = updated_todo
        return updated_todo
    else:
        raise HTTPException(status_code=404, detail="Todo not found")

@app.delete("/todos/{todo_id}", response_model=TodoItem)
async def delete_todo(todo_id: int):
    if 0 <= todo_id < len(todos):
        deleted_todo = todos.pop(todo_id)
        return deleted_todo
    else:
        raise HTTPException(status_code=404, detail="Todo not found")
