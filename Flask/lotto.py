
def generate_lotto_numbers():
    # Set the parameters for the lotto numbers
    total_numbers = 6  # total numbers to pick
    max_number = 45    # maximum number value

    # Use a set to avoid duplicates
    numbers = set()

    # Keep adding unique numbers until we have total_numbers unique values
    while len(numbers) < total_numbers:
        number = random.randint(1, max_number)
        numbers.add(number)

    # Return a sorted list of the numbers
    return sorted(numbers)

# Generate and print lotto numbers
print(generate_lotto_numbers())