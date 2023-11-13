function BinaryHeap(comparator) {
    this.heap = [null]
    this.comparator = comparator
}

BinaryHeap.prototype.score = function(i) {
    return this.comparator.call(this, this.heap[i])
}

BinaryHeap.prototype.maxIndex = function() {
    return this.heap.length - 1
}

BinaryHeap.prototype.peek = function() {
    return this.heap[1]
}

BinaryHeap.prototype.size = function() {
    return this.heap.length - 1
}

BinaryHeap.prototype.swap = function(a, b) {
    const temp = this.heap[b]
    this.heap[b] = this.heap[a]
    this.heap[a] = temp
}

BinaryHeap.prototype.insert = function(value) {
    this.heap.push(value)
    this.bubbleUp(this.maxIndex())
}

BinaryHeap.prototype.bubbleUp = function(i) {
    while (i > 1) {
        const elementScore = this.score(i)
        const parent = Math.floor(i / 2)
        const parentScore = this.score(parent)

        if (elementScore < parentScore) {
            this.swap(i, parent)
            i = parent
        } else {
            break
        }
    }
}

BinaryHeap.prototype.remove = function() {
    const result = this.heap[1]
    const end = this.heap.pop()

    if (this.heap.length > 1) {
        this.heap[1] = end
        this.siftDown(1)
    }
    return result
}

BinaryHeap.prototype.siftDown = function(i) {
    const maxIndex = this.maxIndex()

    while (i < maxIndex) {
        const elementScore = this.score(i)
        const leftChild = i * 2
        const rightChild = leftChild + 1
        let swapIndex = null

        if (leftChild <= maxIndex) {
            if (this.score(leftChild) < elementScore) {
                swapIndex = leftChild
            }
        }

        if (rightChild <= maxIndex) {
            if (this.score(rightChild) < (swapIndex ? this.score(leftChild) : elementScore)) {
                swapIndex = rightChild
            }
        }

        if (!swapIndex) {
            break
        } else {
            this.swap(i, swapIndex)
            i = swapIndex
        }
    }
}
