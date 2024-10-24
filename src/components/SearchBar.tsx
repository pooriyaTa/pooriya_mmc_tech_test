import { SearchIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { Box, Container, Input, InputGroup, InputLeftElement, InputRightElement, Text } from '@chakra-ui/react';


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
        <Box maxW="2xl" w="full" position={'relative'}>
            <InputGroup mx="auto" maxW="2xl" w="full">
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
                    w="full"
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
                <Container maxW="2xl" w="full" p={0}
                    borderTopWidth={1}
                    borderTopColor={'lightgray'}
                    shadow={'xl'}
                    position={'absolute'}
                    mx={0}
                    roundedBottom={"lg"}
                    bg={"whitesmoke"}
                    maxH={'xl'}
                    overflow={"scroll"}
                >
                    {suggestions.length > 0 ? (
                        suggestions.map((suggestion: any, index: number) => (
                            renderSuggestions(suggestion, index)
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
        </Box>

    )
}
