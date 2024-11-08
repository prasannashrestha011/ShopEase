package com.app.backend.App_class;

import java.util.List;
import java.util.Map;

import com.app.backend.Entities.RevenueEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RevenueRecordByDay {
    private Map<Integer, List<RevenueEntity>> records;

}
