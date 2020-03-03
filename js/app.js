(() => {
	// set up the puzzle pieces and boards
	// navButtons -> images at the bottom of the page
	const navButtons = document.querySelectorAll('#buttonHolder img'),
				puzzlePiece = document.querySelectorAll('.puzzle-pieces img'),
				dropZones = document.querySelectorAll('.drop-zone'),
				puzzleBoard = document.querySelector('.puzzle-board');


	// store the image names here
	const pieces = ["topLeft", "topRight", "bottomLeft", "bottomRight"];
	// functions go here => what we want to have happen when our triggers fire
	function changeImageSet() {
		// change the thumbnail images on the left to match the button images
		pieces.forEach((piece, index) => {
			puzzlePiece[index].src = `images/${piece + this.dataset.puzzleindex}.jpg`;
			puzzlePiece[index].id = `${piece + this.dataset.puzzleindex}`;
		// moving the puzzle pieces back to their parent div when clicking another puzzle
			let piecesList = document.querySelector('.puzzle-pieces');
			piecesList.appendChild(puzzlePiece[index]);
			console.log('puzzle pieces reset')
		});

		// and set a background image on the drop zone container
		// debugger;
		puzzleBoard.style.backgroundImage = `url(images/backGround${this.dataset.puzzleindex}.jpg)`;

}

	function dragStart(event) {
		console.log('started a drag');

		// capture the id of the element we're dragging
		// the dataTransfer object is part of the drag event -> you can use this
		// to temporarily store data you can retrieve and use later
		// like an audio track, as an example
		event.dataTransfer.setData("text/plain", this.id);
	}

	function allowDragOver(event) {
		event.preventDefault();
		console.log('you dragged something onto me');
	}

	function allowDrop(event) {

		if (this.children.length >= 1) {
			console.log('error, too many children!');
			return;
		}

		let currentPiece = event.dataTransfer.getData('text/plain');
		event.target.appendChild(document.querySelector(`#${currentPiece}`));
		console.log('drop it');
	}

	// add some event handling for the nav navButtons
	navButtons.forEach(button => button.addEventListener('click', changeImageSet));

	// set up the drag event on our puzzle pieces
	puzzlePiece.forEach(piece => piece.addEventListener('dragstart', dragStart));

// set up the dragover event for our drop zones
	dropZones.forEach(zone => zone.addEventListener('dragover', allowDragOver));

	dropZones.forEach(zone => zone.addEventListener('drop', allowDrop));
	// call, apply and bind are different ways to invoke functions
	// you should know what call does -> research it on MDN
	 changeImageSet.call(navButtons[0]);


})();