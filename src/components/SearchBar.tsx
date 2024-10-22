import { SearchIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { Container, Input, InputGroup, InputLeftElement, InputRightElement, Text } from '@chakra-ui/react';


type ISearchBar = {
    value: string;
    placeholder?: string;
    onClearInput: () => void
    onValueChange: (input: string) => void,
    suggestions: any[],
    renderSuggestions: (item: any, index: number) => React.ReactNode
    suggestionsVisible: boolean
}

export default function SearchBar({ value = "", placeholder = "Search ...", onClearInput, suggestions, renderSuggestions, suggestionsVisible, onValueChange }: ISearchBar) {



    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const userInput = e.target.value;
        onValueChange(userInput)

    };

    return (
        <>
            <InputGroup mx="auto" w="xl">
                <InputLeftElement mt="4">
                    <SearchIcon />
                </InputLeftElement>
                <Input
                    bg={"whitesmoke"}
                    _focus={{
                        bg: "whitesmoke",
                        border: 'none'
                    }}
                    roundedBottom={suggestionsVisible ? 0 : 'lg'}
                    mt="4"
                    w="xl"
                    variant='filled'
                    type="text"
                    value={value}
                    onChange={handleInputChange}
                    placeholder={placeholder}

                />
                {value.length > 0 &&
                    <InputRightElement cursor={"pointer"} onClick={onClearInput} mt="4">
                        <SmallCloseIcon />
                    </InputRightElement>
                }
            </InputGroup>
            {suggestionsVisible && (

                <Container w='xl' p={0}
                    roundedBottom={"lg"}
                    bg={"whitesmoke"}
                    maxH={'xl'}
                    overflow={"scroll"}
                >
                    {suggestions.length > 0 ? (
                        suggestions.map((suggestion: any, index: number) => (
                            renderSuggestions(suggestion, index) // Call the function to render each suggestion
                        ))
                    ) : (
                        value.length > 2 && (
                            <Text color={'gray'} py="2" px={4} textAlign={'center'}>
                                Nothing found for "{value}"
                            </Text>
                        )
                    )}
                </Container>
            )}
        </>
    )
}
