# Troubleshooting

## Running out of space?

See [https://stackoverflow.com/questions/30604846/docker-error-no-space-left-on-device](https://stackoverflow.com/questions/30604846/docker-error-no-space-left-on-device).

The following command works best but you have to be careful with it:

```
docker volume rm $(docker volume ls -qf dangling=true)
```
