'use client';

import { Box, Divider, Tabs, Group, Grid, Flex } from '@mantine/core';
import { IconNews } from '@tabler/icons-react';
import classes from './problempage.module.css';
import ProblemBody from '@/components/problems/ProblemBody';
import SubmitSection from '@/components/problems/SubmitSection/SubmitSection';
import { Problem, Submission } from '@/lib/types';

interface DataProps {
  problem: Problem;
  submissions: Array<Submission>;
}

export default function ProblemPage(props: DataProps) {
  return (
    <Group
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '2%',
      }}
    >
      <Box
        style={{
          maxWidth: '1500px',
        }}
      >
        <Tabs
          defaultValue={'description'}
          variant="outline"
          classNames={{
            root: classes.tabs,
            list: classes.tabsList,
            tab: classes.tab,
          }}
          mt={'xl'}
        >
          <Box className="boxtablist">
            <Tabs.List>
              <Tabs.Tab
                value="description"
                leftSection={<IconNews size={'18'} />}
              >
                Descrição
              </Tabs.Tab>
            </Tabs.List>
          </Box>

          <Divider
            w={'99vw'}
            style={{
              position: 'absolute',
              left: '0px',
              zIndex: -1,
            }}
          />

          <Tabs.Panel value="description" mt={'xl'} mx={'xl'}>
            <Grid gutter={'xs'}>
              <Grid.Col span={{ base: 12, lg: 8 }}>
                <ProblemBody problem={props.problem} />
              </Grid.Col>
              <Grid.Col span={{ base: 12, lg: 4 }}>
                <Flex
                  w="100%"
                  direction="column"
                  align="center"
                  justify="center"
                  style={{ margin: '0% 3%' }}
                >
                  <SubmitSection
                    submissionsData={props.submissions}
                    problemId={props.problem.id}
                  />
                </Flex>
              </Grid.Col>
            </Grid>
          </Tabs.Panel>
        </Tabs>
      </Box>
    </Group>
  );
}
