# queryblast

[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)  

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo= TypeScript&logoColor=white)](https://www.typescriptlang.org/)
[![YAML](https://img.shields.io/badge/YAML-CB171E?style=for-the-badge&logo=yaml&logoColor=fff)](https://yamlscript.org/)

## 🔥 OpenCypher Queries in YAMLscript  

This project enables making **OpenCypher** queries to **AWS Neptune** from [Babashka](https://github.com/babashka/babashka) or [YAMLscript](https://github.com/yaml/yamlscript).  

## 💡 Concept  

`opencypher-yaml` provides a seamless way to execute OpenCypher queries against AWS Neptune using YAMLscript, making it easy to integrate graph queries into scripting workflows.

## 📜 Background  

Graph databases provide a powerful way to model relationships, and **AWS Neptune** offers a scalable graph database engine that supports **OpenCypher**, **Gremlin**, and **SPARQL**. **Babashka** and **YAMLscript** are lightweight scripting tools designed for rapid automation and configuration management.  

This project bridges the gap between Neptune and YAML-based scripting, allowing developers to interact with their graph database without requiring complex query builders or additional dependencies.

## ⚙️ Installation  

### 1️⃣ Build `opencypher-pod.js`  

Ensure you have **Node.js** and **Yarn** installed.  

```sh
yarn install
yarn build
```

### 2️⃣ Set Required Environment Variables  

```sh
export NEPTUNE_ENDPOINT=xxx-xxx.xxxx.us-east-1.neptune.amazonaws.com
export NEPTUNE_PORT=xxxx
export AWS_ACCESS_KEY_ID=xxxxxxx
export AWS_SECRET_ACCESS_KEY=xxxxxxx
export AWS_SESSION_TOKEN=xxxxxxx
```

### 3️⃣ Run the YAMLscript Demo  

```sh
./demo.ys
```

## 💻 Code Walkthrough  

### YAMLscript Example  

```yaml
#!/usr/bin/env ys-0

queryblast =: pods/load-pod('.esbuild/.build/src/queryblast.js')
require queryblast: => qb
result =:
    qb/query!: "MATCH (n) RETURN n LIMIT 1"
say: result
```

This script:
1. Loads the queryblast pod.
2. Requires the `queryblast` module.
3. Runs a queryblast query (`MATCH (n) RETURN n LIMIT 1`).
4. Outputs the result to the console.

## 🚀 Future Ideas  

- Support for **Gremlin** and **SPARQL** in YAMLscript.
- Integration with **serverless Lambda functions** for Neptune queries.
- Enhanced logging and query profiling.
- Example use cases for **social graphs**, **recommendation engines**, and **knowledge graphs**.

## 💻 Contributors  

The following members of Aircraft Operations contributed to this project:  

| ![Daniel Craig](screenshots/avatar_daniel_craig.png) |
| :---: |  
| **Daniel Craig** |  
| [![danielcraig23](https://raster.shields.io/badge/linkedin-%40danielcraig23-lightblue?logo=linkedin&style=for-the-badge)](https://www.linkedin.com/in/danielcraig23) |  

## 📖 Citations  

If you use this software, please cite it using the following metadata:  

```bibtex
@software {
	title = {queryblast},
	author = {Aircraft Operations},
	affiliation = {Southwest Airlines},
	url = {https://github.com/SouthwestAir/queryblast},
	month = {02},
	year = {2025},
	license = {BSD-3-Clause},
	version = {1.0}
}
```