'use client';

import { Box, Divider, Tabs, Group, Grid, Container } from '@mantine/core';
import { IconNews } from '@tabler/icons-react';
import classes from './problempage.module.css';
import ProblemBody from '@/components/problems/ProblemBody';
import SubmitSection from '@/components/problems/SubmitSection/SubmitSection';
import { ProblemDetail, Submission } from '@/lib/types';

interface DataProps {
  problem: ProblemDetail;
  submissions: Array<Submission>;
}

export default function ProblemPage(props: DataProps) {
  return (
    <Group
      style={{
        justifyContent: 'center',
        alignItems: 'center',
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
                <Container>
                  <SubmitSection submissionsData={props.submissions} />
                </Container>
              </Grid.Col>
            </Grid>
          </Tabs.Panel>
        </Tabs>
      </Box>
    </Group>
  );
}
