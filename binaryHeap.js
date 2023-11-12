function BinaryHeap(comparator) {
    this.heap = [null]
    this.comparator = comparator
}

BinaryHeap.prototype.peek = function() {
    return this.heap[1]
}

BinaryHeap.prototype.size = function() {
    return this.heap.length - 1
}

BinaryHeap.prototype.score = function(index) {
    return this.comparator.call(this, this.heap[index])
}

BinaryHeap.prototype.maxIndex = function() {
    return this.heap.length - 1
}

BinaryHeap.prototype.swap = function(i, j) {
    const temp = this.heap[i]
    this.heap[i] = this.heap[j]
    this.heap[j] = temp
}

BinaryHeap.prototype.insert = function(value) {
    this.heap.push(value)
    this.bubbleUp(this.maxIndex())
}

BinaryHeap.prototype.bubbleUp = function(index) {
    while (index > 1) {
        const elementScore = this.score(index)
        const parentIndex = Math.floor(index / 2)
        const parentScore = this.score(parentIndex)

        if (parentScore > elementScore) {
            this.swap(index, parentIndex)
            index = parentIndex
        } else {
            break
        }
    }
}

BinaryHeap.prototype.remove = function() {
    const result = this.heap[1]

    if (this.maxIndex() > 1) {
        this.heap[1] = this.heap.pop()
        this.siftDown(1)
    }

    return result
}

BinaryHeap.prototype.siftDown = function(index) {
    const maxIndex = this.maxIndex()

    while (index < maxIndex) {
        const elementScore = this.score(index)
        const leftChildIndex = index * 2
        const rightChildIndex = leftChildIndex + 1
        let swap = null

        if (leftChildIndex <= maxIndex) {
            if (this.score(leftChildIndex) < elementScore) {
                swap = leftChildIndex
            }
        }

        if (rightChildIndex <= maxIndex) {
            if (this.score(rightChildIndex) < (swap ? this.score(leftChildIndex) : elementScore)) {
                swap = rightChildIndex
            }
        }

        if (swap) {
            this.swap(index, swap)
            index = swap
        } else {
            break
        }
    }
}
