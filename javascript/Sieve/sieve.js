// Sieve of Eratosthenes to retrieve the Nth prime
// optimized w/ upperbound estimation using PNT and trial division for larger inputs - hybrid approach

class Sieve {

  // estimate the upperbound for the Nth number using PNT 
  estimateUpperBound(n) {
    // edge case for PNT to cover any issues with small N  
    if (n < 6) return 15; 

    return Math.floor(n * (Math.log(n) + Math.log(Math.log(n)))) + 1; 
  }


    sieve(upperLimit) {
        if (upperLimit < 2) return [];

        const size = Math.floor((upperLimit - 1) / 2); // only odd numbers to save memory usage 
        const isPrime = new Uint8Array(size).fill(1);  // marker array 1's being prime - 0's not prime
        const primes = [2]; // edge case for 2 being the only even prime numebr
        
        const sqrtUpperLimit = Math.floor(Math.sqrt(upperLimit)); // 
 
        // iterating through every odd number
        for (let i = 0; (2 * i + 3) <= sqrtUpperLimit; i++) {
          //if isPrime @ index is 1 (aka prime) continue, if it's 0, aka not prime, skip the if statement
          if (isPrime[i]) {
              const prime = 2 * i + 3;
              let start = Math.floor((prime * prime - 3) / 2);

              //mark multiples of the current prime as non-prime
              for (let j = start; j < size; j += prime) {
                  isPrime[j] = 0;  
              }
          }
        }

        // Add remaining prime numbers to the primes list
        for (let i = 0; i < size; i++) {
            if (isPrime[i]) primes.push(2 * i + 3);
        }

        return primes;
    }

    // method to find nth prime
    NthPrime(n) {
      if (!Number.isFinite(n) || !Number.isInteger(n) || n < 0) throw new Error('Input must be a non-negative integer');

      const upperBound = this.estimateUpperBound(n + 1);
      let primes = this.sieve(upperBound);

      if (primes.length > n) {
          return primes[n];
      }

      // fallback  -> if estimated upper bound was too low
      // continue checking subsequent odd numbers w/ trial division
      let num = upperBound % 2 === 0 ? upperBound + 1 : upperBound + 2; 
      
      while (primes.length <= n) {
          let isPrime = true;
          const sqrtNum = Math.sqrt(num);

          for (const prime of primes) {
              if (prime > sqrtNum) break;
              if (num % prime === 0) {
                  isPrime = false;
                  break;
              }
          }

          if (isPrime) primes.push(num);
          num += 2; // skip even numbers
      }

      return primes[n];
    }
}

module.exports = Sieve;