package com.appranix.demoapp.util.web;

import java.lang.reflect.Field;

import org.springframework.data.domain.Sort;

/**
 * Sorting utility to handle sorting related activities.
 *
 */
public class SortingUtil {

    /**
     * Makes sure that utility classes (classes that contain only static methods or fields in their API)
     * do not have a public constructor.
     */
    protected SortingUtil() {
        throw new UnsupportedOperationException();
    }

    /**
     * Method to check if the given parameter for sorting is valid.
     *
     * @param clazz class of the object.
     * @param field name
     * @return string field name
     */
    public static String checkSortingParameter(Class<? extends Object> clazz, String field) {

        String fieldName = field.toLowerCase().trim();
        Field[] fields = clazz.getDeclaredFields();
        String sortingField = "";
        //For order by class fields
        for (Field classField : fields) {

            String name = classField.getName().toLowerCase();
            if (fieldName.equals(name) || fieldName.equals("-" + name)) {
                
                sortingField = classField.getName();
            }
        }

        if (sortingField.isEmpty() && fields.length > 0) {
            sortingField = fields[0].getName();
        }

        return sortingField;
    }

    /**
     * Method to check if the given sort direction.
     *
     * @param clazz class of the object
     * @param field field name parameter
     * @return Direction of sorting
     */
    public static Sort.Direction checkSortStyle(Class<? extends Object> clazz, String field) {
        String fieldName = field.toLowerCase().trim();
        Field[] fields = clazz.getDeclaredFields();

        //For order by class fields
        for (Field classField : fields) {
            String name = classField.getName().toLowerCase();

            if (fieldName.equals(name)) {
                return Sort.Direction.ASC;
            } else if (fieldName.equals("-" + name)) {
                return Sort.Direction.DESC;
            }
        }

        return Sort.Direction.ASC;
    }

    /**
     * Gives default value if a null or empty value is provided.
     *
     * @param source the original variable
     * @param value the default value
     * @return either default or source based on the value
     */
    public static String defaultIfNullorEmpty(String source, String value) {

        if (source == null || source.length() == 0) {
            return value;
        }

        return source;
    }

}
