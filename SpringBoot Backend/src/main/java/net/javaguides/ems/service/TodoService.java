package net.javaguides.ems.service;

import net.javaguides.ems.dto.TodoDto;

import java.util.List;

public interface TodoService {
    TodoDto addTodo(TodoDto todoDto);

    TodoDto getTodoById(Long todoId);

    List<TodoDto> getAllTodo();

    TodoDto updateTodo(Long todoId, TodoDto updatedTodo);

    void deleteTodo(Long todoId);

}
