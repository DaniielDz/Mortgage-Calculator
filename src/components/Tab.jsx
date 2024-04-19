import { Tabs, TabList,Tab, } from '@chakra-ui/react'

function TabComponent() {
    return ( 
        <Tabs className='w-full h-full'>
            <TabList className='w-full h-full gap-2 px-5' display="flex"
                justifyContent="space-evenly">
                <Tab className='w-max'>Monthly Payment Breakdown</Tab>
                <Tab className='w-max'>Mortgage Over Time</Tab>
            </TabList>
        </Tabs>
     );
}

export default TabComponent;