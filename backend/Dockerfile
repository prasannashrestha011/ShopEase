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

# Set environment variables for Spring Boot application (make sure these are correct)
ENV SPRING_DATASOURCE_URL=jdbc:postgresql://aws-0-ap-south-1.pooler.supabase.com:6543/postgres
ENV SPRING_DATASOURCE_USERNAME=postgres.tuzjtvykrlpcfbnykeka
ENV SPRING_DATASOURCE_PASSWORD=Prasannajhr123@#

# Expose the port your application runs on (default for Spring Boot is 8080)
EXPOSE 8080

# Command to run the Spring Boot application
ENTRYPOINT ["java", "-jar", "backend-0.0.1-SNAPSHOT.jar"]
