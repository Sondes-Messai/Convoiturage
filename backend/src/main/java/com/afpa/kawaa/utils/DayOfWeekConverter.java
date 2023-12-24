package com.afpa.kawaa.utils;

import java.time.DayOfWeek;
import java.util.HashMap;
import java.util.Map;

public class DayOfWeekConverter {
    private static final Map<String, DayOfWeek> dayAbbreviations = new HashMap<>();

    static {
        dayAbbreviations.put("MON", DayOfWeek.MONDAY);
        dayAbbreviations.put("TUE", DayOfWeek.TUESDAY);
        dayAbbreviations.put("WED", DayOfWeek.WEDNESDAY);
        dayAbbreviations.put("THU", DayOfWeek.THURSDAY);
        dayAbbreviations.put("FRI", DayOfWeek.FRIDAY);
        dayAbbreviations.put("SAT", DayOfWeek.SATURDAY);
        dayAbbreviations.put("SUN", DayOfWeek.SUNDAY);
    }

    public static DayOfWeek convertToDayOfWeek(String abbreviation) {
        return dayAbbreviations.get(abbreviation);
    }
}

