# Stage 1: Build with Maven
FROM maven:3-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
RUN ./mvnw clean package -DskipTests

# Stage 2: Runtime image
FROM eclipse-temurin:17-alpine
WORKDIR /app

# Copy the built JAR to current dir and rename it to app.jar
COPY --from=build /app/target/twitter-yt-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

# Start app
ENTRYPOINT ["java", "-jar", "app.jar"]
