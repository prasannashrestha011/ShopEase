package com.app.backend.App_utils;

import java.util.ArrayList;
import java.util.List;

public class Extractors {
    
    public static List<String> PublicIdsExtractor(List<String> urls){
        if(urls.isEmpty()) return null;
  
        List<String> publicIds=new ArrayList<>();
       for (String url : urls) {
            var idx=url.indexOf("/product_images");
            if(idx==-1)  return new ArrayList<>();;
            
            var publicId=url.substring(idx+1);
            publicId = publicId.replaceAll("\\.(jpg|jpeg|png|gif|bmp)$", ""); // Removes extensions

            publicIds.add(publicId);
       }
       return publicIds;
    } 
}
