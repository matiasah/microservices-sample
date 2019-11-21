# Debian 9
FROM debian:9

# Corretto 11
COPY --from=amazoncorretto:11 / /

# Maven
COPY --from=maven:3.6.1 / /