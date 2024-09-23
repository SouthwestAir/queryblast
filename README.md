# queryblast

This project enables making Opencypher queries to AWS Neptune from [Babashka](https://github.com/babashka/babashka) or [YAMLscript](https://github.com/yaml/yamlscript)

# YAMLscript demo code: 

*demo.ys*


    #!/usr/bin/env ys-0

    queryblast =: pods/load-pod('.esbuild/.build/src/queryblast.js')
    require queryblast: => qb
    result =:
        qb/query!: "MATCH (n) RETURN n LIMIT 1"
    say: result


# Running the YAMLscript demo code: 

*first, build queryblast.js by installing the dependencies and then running yarn build*

    yarn install
    yarn build


*then set required env variables:*


    NEPTUNE_ENDPOINT=xxx-xxx.xxxx.us-east-1.neptune.amazonaws.com
    NEPTUNE_PORT=xxxx
    AWS_ACCESS_KEY_ID=xxxxxxx
    AWS_SECRET_ACCESS_KEY=xxxxxxx
    AWS_SESSION_TOKEN=xxxxxxx


*then run ./demo.ys*

    
    ./demo.ys
