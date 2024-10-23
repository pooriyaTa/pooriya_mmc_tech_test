import { Grid, HStack, Text } from '@chakra-ui/react'

export type Isong = {
    title: string,
    length: string
}
type ISongs = {
    data: Isong[]
}
export default function Songs({ data }: ISongs) {
    return (
        <Grid mt={'2'} templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={2} columnGap={4} w={'full'}>
            {data?.map((song: any, index: number) => {
                return (
                    <HStack key={index} alignItems={'center'} justifyContent={'space-between'}>
                        <Text fontSize={'md'} >{song.title}</Text>
                        <Text fontSize={'md'} >{song.length}</Text>
                    </HStack>
                )
            })}
        </Grid>
    )
}
