Upload
scp -r /Users/yichen/Downloads/meta_learn_dax/ cocodev@207.244.121.250:/home/cocodev/apps/experiments/yichenli/

Download
scp -r cocodev@207.244.121.250:/home/cocodev/apps/experiments/yichenli/meta_learn_dat/data/ /Users/yichen/Downloads/meta_learn_dax/

URL
https://cocodev.opalstacked.com/experiments/yichenli/meta_learn_dax/index.html


This is an experiment about learning novel word-token associations and functional operations.
The experiment follows a meta-learning design. 
There are 3 episodes in total. 
In each episode, a different set of word/token primitives, and a different set of mappings/associations (i.e. the grammar) will be used.

Universe of primitives for the entire experiment:
- Universe of input symbol (nonsense word) IDs: 1, 2, 3, ..., 21
- Universe of output symbol (emoji token) IDs: a, b, c, ..., l
- Universe of function IDs: X (repeat x3), Y (interleave), Z (reverse)

Remember, each episode uses a different set of input/output primitives and their mappings (grammar).

The first episode is training, so feedback (correct solutions) of the practice examples will be given.
The second episode is an extended training, preparing participants to get familiar with the meta-learning design. The grammar will be different from the first episode, but feedback will still be provided.
The third episode is testing, where a new grammar will be used, and no feedback will be given.
We are specifically interested in human performance in the third episode.

The underlying grammar for each episode will not be displayed to participants directly. Instead, participants need to infer the correct grammar (i.e. the input-output associations, input-function associations, and the order to apply functions in combinations) from the demonstrations. 
In the first 2 episodes, participants will get to practice on new examples and receive feedback. But the 3rd episode does not have any practice, and only has test examples with no feedback.


Episode 1 (Grammar 1) - Training
	Primitives
	- Input symbol: 1, 2, 3, 4, 5, 6, 7
	- Output symbol: a, b, c, d
	- Functions: X, Y, Z, and their combinations
	Grammar
		1 -> a
		2 -> b
		3 -> c
		4 -> d
		5 -> X
		6 -> Y
		7 -> Z
		arg1 X -> arg1 arg1 arg1
		arg1 Y arg2 -> arg1 arg2 arg1
		arg1 Z arg2 -> arg2 arg1
		arg1 arg2 -> arg1 arg2
		(arg1 and arg2 are variables that can mean any arbitrary input symbols in the universe of this episode)
		Function priorities during combination: first X, then Y, finally Z
	Page 1 (trivial word-token)
		Demo: 1 -> a
		Demo: 2 -> b
		Demo: 3 -> c
		Demo: 4 -> d
	Page 2 (function X)
		Demo: 1 5 -> a a a
		Demo: 3 5 -> c c c
		Practice: 2 5 -> b b b
		Practice: 4 5 -> d d d
	Page 3 (function Y)	
		Demo: 1 6 2 -> a b a
		Demo: 1 6 3 -> a c a
		Practice: 1 6 4 -> a d a
		Practice: 3 6 4 -> c d c
	Page 4 (function Z)
		Demo: 1 7 2 -> b a
		Demo: 2 7 3 -> c a
		Practice: 1 7 4 -> d a
		Practice: 3 7 4 -> d c
	Page 5 (function combinations)
		Demo (1, 2): arg1 X Y arg2 -> (arg1 X) Y arg2 -> arg1 arg1 arg1 arg2 arg1 arg1 arg1
		Demo (1, 3): arg1 Y arg2 X -> arg1 Y (arg2 X) -> arg1 arg1 arg1 arg3 arg1 arg1 arg1
		Demo (1, 2): arg1 X Z arg2 -> (arg1 X) Z arg2 -> arg2 arg1 arg1 arg1
		Demo (1, 3): arg1 Z arg2 X -> arg1 Z (arg2 X) -> arg2 arg2 arg2 arg1
		Demo (1, 2, 3): arg1 Y arg2 Z arg3 -> (arg1 Y arg2) Z arg3 -> arg3 arg1 arg2 arg1
		Demo (1, 2, 3): arg1 Z arg2 Y arg3 -> arg1 Z (arg2 Y arg3) -> arg2 arg3 arg2 arg1
		Practice (2, 3): arg1 X Y arg2 -> (arg1 X) Y arg2 -> arg1 arg1 arg1 arg2 arg1 arg1 arg1
		Practice (3, 4): arg1 Y arg2 X -> arg1 Y (arg2 X) -> arg1 arg2 arg2 arg2 arg1
		Practice (2, 3): arg1 X Z arg2 -> (arg1 X) Z arg2 -> arg2 arg1 arg1 arg1
		Practice (3, 4): arg1 Z arg2 X -> arg1 Z (arg2 X) -> arg2 arg2 arg2 arg1
		Practice (1, 3, 4): arg1 Y arg2 Z arg3 -> (arg1 Y arg2) Z arg3 -> arg3 arg1 arg2 arg1
		Practice (2, 3, 4): arg1 Z arg2 Y arg3 -> arg1 Z (arg2 Y arg3) -> arg2 arg3 arg2 arg1
		Practice (1, 2, 4): arg1 Y arg2 Z arg3 X -> (arg1 Y arg2) Z (arg3 X) -> arg3 arg3 arg3 arg1 arg2 arg1
		Practice (1, 3, 4): arg1 X Z arg2 Y arg3 -> (arg1 X) Z (arg2 Y arg3) -> arg2 arg3 arg2 arg1 arg1 arg1
		Practice (2, 3, 4): arg1 Z arg2 Y X arg3 -> arg1 Z (arg2 Y (X arg3)) -> arg2 arg3 arg3 arg3 arg2 arg1
		(randomize argument-token mapping in the parenthesis)


Episode 2 (Grammar 3) - Familiarization
	Primitives
	- Input symbol: 8, 9, 10, 11, 12, 13, 14
	- Output symbol: e, f, g, h
	- Functions: X, Y, Z, and their combinations
	Grammar
		8 -> e
		9 -> f
		10 -> g
		11 -> h
		12 -> X
		13 -> Y
		14 -> Z
		arg1 X -> arg1 arg1 arg1
		arg1 Y arg2 -> arg1 arg2 arg1
		arg1 Z arg2 -> arg2 arg1
		arg1 arg2 -> arg1 arg2
		(arg1 and arg2 are variables that can mean any arbitrary input symbols in the universe of this episode)
		Function priorities during combination: first X, then Y, finally Z
	Page 1 (trivial word-token)
		Demo: 8 -> e
		Demo: 9 -> f
		Demo: 10 -> g
		Demo: 11 -> h
	Page 2 (function X)
		Demo: 8 12 -> e e e
		Demo: 10 12 -> g g g
		Practice: 9 12 -> f f f
		Practice: 11 12 -> h h h
	Page 3 (function Y)	
		Demo: 8 13 9 -> e f e
		Demo: 8 13 10 -> e g e
		Practice: 8 13 11 -> e h e
		Practice: 10 13 11 -> g h g
	Page 4 (function Z)
		Demo: 8 14 9 -> f e
		Demo: 9 14 10 -> g e
		Practice: 8 14 11 -> h e
		Practice: 10 14 11 -> h g
	Page 5 (function combinations)
		Demo (8, 9): arg1 X Y arg2 -> (arg1 X) Y arg2 -> arg1 arg1 arg1 arg2 arg1 arg1 arg1
		Demo (8, 10): arg1 Y arg2 X -> arg1 Y (arg2 X) -> arg1 arg1 arg1 arg3 arg1 arg1 arg1
		Demo (8, 9): arg1 X Z arg2 -> (arg1 X) Z arg2 -> arg2 arg1 arg1 arg1
		Demo (8, 10): arg1 Z arg2 X -> arg1 Z (arg2 X) -> arg2 arg2 arg2 arg1
		Demo (8, 9, 10): arg1 Y arg2 Z arg3 -> (arg1 Y arg2) Z arg3 -> arg3 arg1 arg2 arg1
		Demo (8, 9, 10): arg1 Z arg2 Y arg3 -> arg1 Z (arg2 Y arg3) -> arg2 arg3 arg2 arg1
		Practice (9, 10): arg1 X Y arg2 -> (arg1 X) Y arg2 -> arg1 arg1 arg1 arg2 arg1 arg1 arg1
		Practice (10, 11): arg1 Y arg2 X -> arg1 Y (arg2 X) -> arg1 arg2 arg2 arg2 arg1
		Practice (9, 10): arg1 X Z arg2 -> (arg1 X) Z arg2 -> arg2 arg1 arg1 arg1
		Practice (10, 11): arg1 Z arg2 X -> arg1 Z (arg2 X) -> arg2 arg2 arg2 arg1
		Practice (8, 10, 11): arg1 Y arg2 Z arg3 -> (arg1 Y arg2) Z arg3 -> arg3 arg1 arg2 arg1
		Practice (9, 10, 11): arg1 Z arg2 Y arg3 -> arg1 Z (arg2 Y arg3) -> arg2 arg3 arg2 arg1
		Practice (8, 9, 11): arg1 Y arg2 Z arg3 X -> (arg1 Y arg2) Z (arg3 X) -> arg3 arg3 arg3 arg1 arg2 arg1
		Practice (8, 10, 11): arg1 X Z arg2 Y arg3 -> (arg1 X) Z (arg2 Y arg3) -> arg2 arg3 arg2 arg1 arg1 arg1
		Practice (9, 10, 11): arg1 Z arg2 Y X arg3 -> arg1 Z (arg2 Y (X arg3)) -> arg2 arg3 arg3 arg3 arg2 arg1


Episode 3 (Grammar 3) - Testing
	Primitives
	- Input symbol: 15, 16, 17, 18, 19, 20, 21
	- Output symbol: i, j, k, l
	- Functions: X, Y, Z, and their combinations
	Grammar
		15 -> i
		16 -> j
		17 -> k
		18 -> l
		19 -> X
		20 -> Y
		21 -> Z
		arg1 X -> arg1 arg1 arg1
		arg1 Y arg2 -> arg1 arg2 arg1
		arg1 Z arg2 -> arg2 arg1
		arg1 arg2 -> arg1 arg2
		(arg1 and arg2 are variables that can mean any arbitrary input symbols in the universe of this episode)
		Function priorities during combination: first X, then Y, finally Z
	Page 1 (trivial word-token)
		Demo: 15 -> i
		Demo: 16 -> j
		Demo: 17 -> k
		Demo: 18 -> l
	Page 2 (function X)
		Demo: 15 19 -> i i i
		Demo: 17 19 -> k k k
		Test: 16 19 -> j j j
		Test: 18 19 -> l l l
	Page 3 (function Y)	
		Demo: 15 20 16 -> i j i
		Demo: 15 20 17 -> i k i
		Test: 15 20 18 -> i l i
		Test: 17 20 18 -> k l k
	Page 4 (function Z)
		Demo: 15 21 16 -> j i
		Demo: 16 21 17 -> k i
		Test: 15 21 18 -> l i
		Test: 17 21 18 -> l k
	Page 5 (function combinations)
		Demo (15, 16): arg1 X Y arg2 -> (arg1 X) Y arg2 -> arg1 arg1 arg1 arg2 arg1 arg1 arg1
		Demo (15, 17): arg1 Y arg2 X -> arg1 Y (arg2 X) -> arg1 arg1 arg1 arg3 arg1 arg1 arg1
		Demo (15, 16): arg1 X Z arg2 -> (arg1 X) Z arg2 -> arg2 arg1 arg1 arg1
		Demo (15, 17): arg1 Z arg2 X -> arg1 Z (arg2 X) -> arg2 arg2 arg2 arg1
		Demo (15, 16, 17): arg1 Y arg2 Z arg3 -> (arg1 Y arg2) Z arg3 -> arg3 arg1 arg2 arg1
		Demo (15, 16, 17): arg1 Z arg2 Y arg3 -> arg1 Z (arg2 Y arg3) -> arg2 arg3 arg2 arg1
		Test (16, 17): arg1 X Y arg2 -> (arg1 X) Y arg2 -> arg1 arg1 arg1 arg2 arg1 arg1 arg1
		Test (17, 18): arg1 Y arg2 X -> arg1 Y (arg2 X) -> arg1 arg2 arg2 arg2 arg1
		Test (16, 17): arg1 X Z arg2 -> (arg1 X) Z arg2 -> arg2 arg1 arg1 arg1
		Test (17, 18): arg1 Z arg2 X -> arg1 Z (arg2 X) -> arg2 arg2 arg2 arg1
		Test (15, 17, 18): arg1 Y arg2 Z arg3 -> (arg1 Y arg2) Z arg3 -> arg3 arg1 arg2 arg1
		Test (16, 17, 18): arg1 Z arg2 Y arg3 -> arg1 Z (arg2 Y arg3) -> arg2 arg3 arg2 arg1
		Test (15, 16, 18): arg1 Y arg2 Z arg3 X -> (arg1 Y arg2) Z (arg3 X) -> arg3 arg3 arg3 arg1 arg2 arg1
		Test (15, 17, 18): arg1 X Z arg2 Y arg3 -> (arg1 X) Z (arg2 Y arg3) -> arg2 arg3 arg2 arg1 arg1 arg1
		Test (16, 17, 18): arg1 Z arg2 Y X arg3 -> arg1 Z (arg2 Y (X arg3)) -> arg2 arg3 arg3 arg3 arg2 arg1

