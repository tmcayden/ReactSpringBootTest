package net.javaguides.ems.service.impl;

import net.javaguides.ems.dto.TodoDto;
import net.javaguides.ems.entity.Todo;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;

import static org.junit.jupiter.api.Assertions.*;

class TodoServiceImplTest {

    private ModelMapper modelMapper = new ModelMapper();

    @Test
    void addTodo() {
        Todo todo = new Todo();
        todo.setTitle("Test1");
        todo.setDescription("Description1");
        todo.setCompleted(false);

        TodoDto todoDto = modelMapper.map(todo, TodoDto.class);

        assertEquals(todo.getTitle(), todoDto.getTitle());
        assertEquals(todo.getDescription(), todoDto.getDescription());
        assertEquals(todo.getId(), todoDto.getId());
        assertEquals(todo.isCompleted(), todoDto.isCompleted());

        Todo savedTodo = modelMapper.map(todoDto, Todo.class);
        assertEquals(savedTodo.getTitle(), todoDto.getTitle());
        assertEquals(savedTodo.getDescription(), todoDto.getDescription());
        assertEquals(savedTodo.getId(), todoDto.getId());
        assertEquals(savedTodo.isCompleted(), todoDto.isCompleted());
    }
}