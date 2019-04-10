<?php 
	
	for ($i=1; $i <= 100; $i++) { 
		echo "$i <br>";
		if ($i % 4 == 0) {
			echo "FIL <br>";
		}
		if ($i % 6 == 0) {
			echo "KOM <br>";
		}
		if ($i % 4 == 0 && $i % 6 ==0) {
			echo "FILKOM <br>";
		}
	}

 ?>