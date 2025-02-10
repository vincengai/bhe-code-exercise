class Sieve {

  estimateUpperBound(n) {
        if (n < 6) return 15; 

        return Math.floor(n * (Math.log(n) + Math.log(Math.log(n)))) + 1; 
    }


    sieve(upperLimit) {
        if (upperLimit < 2) return [];

        const size = Math.floor((upperLimit - 1) / 2);
        const isPrime = new Uint8Array(size).fill(1); 
        const primes = [2];
        
        const sqrtUpperLimit = Math.floor(Math.sqrt(upperLimit));
 
        for (let i = 0; (2 * i + 3) <= sqrtUpperLimit; i++) {

            if (isPrime[i]) {
                const prime = 2 * i + 3;
                let start = Math.floor((prime * prime - 3) / 2);

                for (let j = start; j < size; j += prime) {
                    isPrime[j] = 0; 
                }
            }
        }

        for (let i = 0; i < size; i++) {
            if (isPrime[i]) primes.push(2 * i + 3);
        }

        return primes;
    }

    NthPrime(n) {
        if (n < 0) throw new Error('Input must be a non-negative integer');

        const upperBound = this.estimateUpperBound(n + 1);
        let primes = this.sieve(upperBound);

        if (primes.length > n) {
            return primes[n];
        }

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
            num += 2; 
        }

        return primes[n];
    }
}

module.exports = Sieve;