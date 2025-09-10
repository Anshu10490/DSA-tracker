package com.oushnik.dsa.dsatracker.controller;

import com.oushnik.dsa.dsatracker.model.Problem;
import com.oushnik.dsa.dsatracker.model.StatsResponse;

import jakarta.servlet.http.HttpServletResponse;

import com.oushnik.dsa.dsatracker.Repository.ProblemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@CrossOrigin(origins = "*") // <-- Add this line to enable CORS for frontend requests
@RequestMapping("/api/problems")
public class ProblemController {

    @Autowired
    private ProblemRepository repo;

    @PostMapping
    public Problem add(@RequestBody Problem p) {
        return repo.save(p);
    }

    @GetMapping
    public List<Problem> all() {
        return repo.findAll();
    }

    @GetMapping("/tag/{tag}")
public List<Problem> getByTag(@PathVariable String tag) {
    return repo.findByTag(tag);
}

@GetMapping("/solved")
public List<Problem> getSolved() {
    return repo.findBySolved(true);
}

@GetMapping("/unsolved")
public List<Problem> getUnsolved() {
    return repo.findBySolved(false);
}

@GetMapping("/stats")
public StatsResponse getStats() {
    List<Problem> all = repo.findAll();

    long total = all.size();
    long solved = all.stream().filter(Problem::isSolved).count();
    long unsolved = total - solved;

    Map<String, Long> tagCount = all.stream()
        .collect(java.util.stream.Collectors.groupingBy(
            Problem::getTag,
            java.util.stream.Collectors.counting()
        ));

    return new StatsResponse(total, solved, unsolved, tagCount);
}

@GetMapping(value = "/export", produces = "text/csv")
public void exportCsv(HttpServletResponse response) throws IOException {
    response.setContentType("text/csv");
    response.setHeader("Content-Disposition", "attachment; filename=problems.csv");

    List<Problem> all = repo.findAll();

    PrintWriter writer = response.getWriter();
    writer.println("id,title,url,tag,difficulty,solved");

    for (Problem p : all) {
        writer.printf("%d,%s,%s,%s,%s,%s\n",
            p.getId(),
            p.getTitle().replace(",", " "), // Avoid CSV breaking
            p.getUrl(),
            p.getTag(),
            p.getDifficulty(),
            p.isSolved()
        );
    }

    writer.flush();
    writer.close();
}

@PutMapping("/{id}")
public Problem update(@PathVariable Long id, @RequestBody Problem p) {
    Problem existing = repo.findById(id).orElseThrow();
    existing.setTitle(p.getTitle());
    existing.setUrl(p.getUrl());
    existing.setTag(p.getTag());
    existing.setDifficulty(p.getDifficulty());
    existing.setSolved(p.isSolved());
    return repo.save(existing);
}

@DeleteMapping("/{id}")
public void delete(@PathVariable Long id) {
    repo.deleteById(id);
}


}

