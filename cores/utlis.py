import re
def validate_phone_number(phone_number):
    # Define a regular expression pattern for a simple phone number validation
    # This pattern assumes a common format: +1234567890 or 123-456-7890 or (123) 456-7890
    pattern = re.compile(r'^(\+\d{1,2}\s?)?(\(\d{3}\)|\d{3})([-.\s]?)\d{3}([-.]?)\d{4}$')

    # Check if the phone number matches the pattern
    if pattern.match(phone_number):
        return True
    else:
        return False
