package net.javaguides.ems.mapper;

import net.javaguides.ems.dto.TodoDto;
import net.javaguides.ems.entity.Todo;

public class TodoMapper {
    public static TodoDto mapToTodoDto(Todo todo) {
        return new TodoDto(
                todo.getId(),
                todo.getTitle(),
                todo.getDescription(),
                todo.isCompleted(),
                todo.getEmployee().getId()
        );
    }

    public static Todo mapToTodo(TodoDto todoDto) {
        Todo todo = new Todo();
        todo.setTitle(todoDto.getTitle());
        todo.setDescription(todoDto.getDescription());
        todo.setCompleted(todo.isCompleted());
        todo.setId((todoDto.getEmployeeId()));
        //Set employee?
        return todo;
    }
}
