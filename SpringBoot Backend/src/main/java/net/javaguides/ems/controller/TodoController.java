package net.javaguides.ems.controller;

import lombok.AllArgsConstructor;
import net.javaguides.ems.dto.TodoDto;
import net.javaguides.ems.service.TodoService;
import org.apache.coyote.Response;
import org.springframework.http.HttpRange;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpResponse;
import java.util.List;

@RestController
@RequestMapping("api/todos")
@AllArgsConstructor
@CrossOrigin("http://localhost:3000")
public class TodoController {
    private TodoService todoService;

    //Build Add task REST API

    @PostMapping()
    public ResponseEntity<TodoDto> addTodo(@RequestBody TodoDto todoDto){
        TodoDto savedTodo = todoService.addTodo(todoDto);
        return new ResponseEntity<>(savedTodo, HttpStatus.CREATED);
    }
    // Build get task by id rest api
    @GetMapping("{id}")
    public ResponseEntity<TodoDto> getTodoById(@PathVariable("id") Long todoId){
        TodoDto todoDto = todoService.getTodoById(todoId);
        return ResponseEntity.ok(todoDto);
    }

    // build get all tasks rest api
    @GetMapping()
    public ResponseEntity<List<TodoDto>> getAllTodo()
    {
        List<TodoDto> todos = todoService.getAllTodo();
        return ResponseEntity.ok(todos);
    }

    // Build Update Task REST API
    @PutMapping("{id}")
    public ResponseEntity<TodoDto> updateTodo(@PathVariable Long id, @RequestBody TodoDto updatedTodo)
    {
        TodoDto updatedTodoDto = todoService.updateTodo(id, updatedTodo);
        return ResponseEntity.ok(updatedTodoDto);
    }

    // Build Delete Task REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteTodo(@PathVariable Long id)
    {
        todoService.deleteTodo(id);
        return ResponseEntity.ok("Task deleted successfully");
    }
}
