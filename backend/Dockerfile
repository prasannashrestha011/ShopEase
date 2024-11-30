# Use Maven with OpenJDK as the base image for building the application
FROM maven:3.8.4-openjdk-17-slim AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the source code into the container
COPY . /app

# Build the application using Maven
RUN mvn clean package -DskipTests

# Use OpenJDK runtime for the final image
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the application JAR file from the build stage
COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar /app/backend-0.0.1-SNAPSHOT.jar

# Set environment variables for Spring Boot application 
ENV SPRING_DATASOURCE_URL=jdbc:postgresql://dpg-ct5batl2ng1s738mn62g-a.oregon-postgres.render.com:5432/springboot_o909

ENV SPRING_DATASOURCE_USERNAME=root
ENV SPRING_DATASOURCE_PASSWORD=yag5AYtTbSpqc2rw7Zt1HnlzN1m2xl0j

# Expose the port your application runs on (default for Spring Boot is 8080)
EXPOSE 8080

# Command to run the Spring Boot application
ENTRYPOINT ["java", "-jar", "backend-0.0.1-SNAPSHOT.jar"]
