#!/usr/bin/env node

import * as fs from "node:fs";
import * as os from "node:os";

import bencodec, {BencodeDictionary, BencodeTypes} from 'bencodec';
import {
    ExecuteOpenCypherQueryCommand, ExecuteOpenCypherQueryCommandOutput,
    ExecuteOpenCypherQueryInput,
    NeptunedataClient
} from "@aws-sdk/client-neptunedata";

const config: { endpoint: string } = {
    endpoint: `https://${process.env.NEPTUNE_ENDPOINT}:${process.env.NEPTUNE_PORT}`
};

const client = new NeptunedataClient(config);

const debug = (msg : string) : void => {
    fs.appendFile("debug.log", `msg: ${msg}${os.EOL}`, () => {});
}

const write = (obj : Object) => {
    process.stdout.write(bencodec.encode(obj, { stringify: true }));
}

const queryblastPod = async () => {
    process.stdin.on('data', async data => {
        const msg: BencodeDictionary = bencodec.decode(data, {stringify: true});
        const op: BencodeTypes = msg.op;

        if (op === "describe") {
            write({
                    "format": "json",
                    "namespaces": [{
                        "name": "queryblast",
                        "vars": [{"name": "query!"}]
                    }]
                }
            )
        } else if (op === "invoke") {
            const variable: BencodeTypes = msg.var;
            const id: BencodeTypes = msg.id;
            const args : BencodeTypes = msg.args;
            const [query, params]= JSON.parse(args.toString());
            debug(`query: ${query}`);
            debug(`params: ${params}`);

            let result = null;

            const input: ExecuteOpenCypherQueryInput = {
                openCypherQuery: query,
                parameters: params
            };

            const command: ExecuteOpenCypherQueryCommand = new ExecuteOpenCypherQueryCommand(input);

            if (variable === "queryblast/query!") {
                try {
                    const response : ExecuteOpenCypherQueryCommandOutput = await client.send(command);
                    result = response.results;
                } catch (err) {
                    debug(`error: ${err}`)
                    write({"value": JSON.stringify(result), "id": id, "status": ["done"]})
                }
            }

            write({"value": JSON.stringify(result), "id": id, "status": ["done"]})
        }
    });
};

export function main() : void {
    debug("starting up");
    queryblastPod().then(() => debug("Goodbye!"));
}

if (require.main === module) {
    main();
}
