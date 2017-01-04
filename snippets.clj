;takes a start and end number, returns a list of numbers from start(inclusive) to end(exclusive)
(fn makeRange [start end] (if (< start end) (conj (makeRange (+ start 1) end) start) '() ))
