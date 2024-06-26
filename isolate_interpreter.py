import time
def isolate_interpreter(code):
  """Interprets basic Isolate language instructions."""

  # Split the code into lines (fix \n issue)
  lines = code.splitlines()

  # Iterate through each line
  for line in lines:
    # Remove comments and trailing spaces
    line = line.split('//')[0].strip()

    # Check for valid commands
    if line.startswith('isolate'):
      # Extract command and argument (handle extra spaces)
      parts = line.split(" ")[1:]
      command = parts[0].strip("()")
      argument = " ".join(parts[1:]).strip('"')
      if command == "time":
       if type(int(parts[1])) == int:
         ghs = int(parts[1])
      
       else: 
         ghs = 1

      # Execute the command
      if command == "print":
        print(argument)
      # Add more commands and error handling here...
      elif command == "endsc":  # Simplified check for "endsc"
        break  # Terminate the interpreter loop
      elif command == "time":
        time.sleep(ghs)
      elif command == "fr":
        print ("hello creator")  
      else:
        print(f"Error: Unknown command '{command}'")  # Improved error handling

# Example code
code = """
// This is a comment
isolate (print) fearless
endsc  // Script ends here
"""

# Run the interpreter with the example code
isolate_interpreter(code)
