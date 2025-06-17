

# Stage 1: Build the application using Maven
FROM maven:3-eclipse-temurin-17 AS build

# Set working directory
WORKDIR /app

# Copy all project files into the container
COPY . .

# Package the application (without running tests)
RUN mvn clean package -DskipTests

# Stage 2: Create a minimal runtime image
FROM eclipse-temurin:17-alpine

# Set working directory
WORKDIR /app

# Copy the jar file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port your app runs on
EXPOSE 8080

# Start the application
ENTRYPOINT ["java", "-jar", "app.jar"]