(require '[babashka.pods :as pods])

(pods/load-pod "./queryblast")

(require 'queryblast)

(prn (queryblast/query! "MATCH (n) RETURN n LIMIT 1"))