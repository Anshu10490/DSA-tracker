package com.oushnik.dsa.dsatracker.Repository;

import com.oushnik.dsa.dsatracker.model.Problem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProblemRepository extends JpaRepository<Problem, Long> {
    List<Problem> findByTag(String tag);
    List<Problem> findBySolved(boolean solved);
    List<Problem> findAll();

}


