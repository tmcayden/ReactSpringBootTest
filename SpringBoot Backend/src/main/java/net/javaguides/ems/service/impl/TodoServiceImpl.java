package net.javaguides.ems.service.impl;

import lombok.AllArgsConstructor;
import net.javaguides.ems.dto.TodoDto;
import net.javaguides.ems.entity.Employee;
import net.javaguides.ems.entity.Todo;
import net.javaguides.ems.exception.ResourceNotFoundException;
import net.javaguides.ems.repository.EmployeeRepository;
import net.javaguides.ems.repository.TodoRepository;
import net.javaguides.ems.service.TodoService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TodoServiceImpl implements TodoService {

    private TodoRepository todoRepository;
    private ModelMapper modelMapper;
    private EmployeeRepository employeeRepository;

    @Override
    public TodoDto addTodo(TodoDto todoDto) {
        //convert todoDto to todoJPA entity
        Todo todo = modelMapper.map(todoDto, Todo.class);
        if (todoDto.getEmployee() != null)
        {
            Employee employee = employeeRepository.findById(todoDto.getEmployee().getId())
                    .orElseThrow(() ->
                    new ResourceNotFoundException("An Employee does not exist with id: " + todoDto.getEmployee().getId()));
            todo.setEmployee(employee);
        }
        Todo savedTodo = todoRepository.save(todo);
        // Convert saved todoJPA entity to todoDTO object
        return modelMapper.map(savedTodo, TodoDto.class);
    }

    @Override
    public TodoDto getTodoById(Long todoId) {
        Todo todo = todoRepository.findById(todoId)
                .orElseThrow(() -> new ResourceNotFoundException("A task was not found with ID: " + todoId));
        return modelMapper.map(todo, TodoDto.class);
    }

    @Override
    public List<TodoDto> getAllTodo() {
        List<Todo> todos = todoRepository.findAll();
        return todos.stream().map(todo -> modelMapper.map(todo, TodoDto.class)).collect(Collectors.toList());
        }

    @Override
    public TodoDto updateTodo(Long todoId, TodoDto updatedTodo) {
        Todo oldTodo = todoRepository.findById(todoId).orElseThrow(() -> new ResourceNotFoundException("A task was not found with ID: " + todoId));
        oldTodo.setTitle(updatedTodo.getTitle());
        oldTodo.setCompleted(updatedTodo.isCompleted());
        oldTodo.setDescription(updatedTodo.getDescription());
        oldTodo.setEmployee(updatedTodo.getEmployee());
        if (updatedTodo.getEmployee() != null)
        {
            Employee employee = employeeRepository.findById(updatedTodo.getEmployee().getId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException("An Employee does not exist with id: " + updatedTodo.getEmployee().getId()));
            oldTodo.setEmployee(employee);
        }
        Todo savedTodo = todoRepository.save(oldTodo);
        return modelMapper.map(savedTodo, TodoDto.class);
    }

    @Override
    public void deleteTodo(Long todoId) {
           Todo todo = todoRepository.findById(todoId).orElseThrow(() -> new ResourceNotFoundException("A task was not found with ID: " + todoId));
           todoRepository.delete(todo);
    }
}
