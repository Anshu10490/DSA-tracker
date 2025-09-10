package com.oushnik.dsa.dsatracker.model;

import java.util.Map;

public class StatsResponse {
    private long total;
    private long solved;
    private long unsolved;
    private Map<String, Long> tags;

    public StatsResponse(long total, long solved, long unsolved, Map<String, Long> tags) {
        this.total = total;
        this.solved = solved;
        this.unsolved = unsolved;
        this.tags = tags;
    }

    public long getTotal() { return total; }
    public long getSolved() { return solved; }
    public long getUnsolved() { return unsolved; }
    public Map<String, Long> getTags() { return tags; }
}
