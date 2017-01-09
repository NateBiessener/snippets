;takes a start and end number, returns a list of numbers from start(inclusive) to end(exclusive)
(defn makeRange [start end] (if (< start end) (conj (makeRange (+ start 1) end) start) '() ))

;Write a function which takes two sequences and returns the first item from each, then the second item from each, then the third, etc.
(defn ileave [vec1 vec2]
  (if (or (nil? (first vec1)) (nil? (first vec2)))
  	nil
    (let [singlePair [(first vec1) (first vec2)]]
      (if (and (> (count vec1) 1) (> (count vec2) 1))
        (apply conj singlePair (ileave (rest vec1) (rest vec2)))
        singlePair
      )
    )
  )
)
