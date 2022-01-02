//
// Created by b8313 on 2022/1/2.
//

#ifndef INTERVIEW_ACCESS_FORK_H
#define INTERVIEW_ACCESS_FORK_H
#include <unistd.h>
#include <stdio.h>

class fork {
public:
    void check_var(void){

            // 创建进程
            pid_t pid = fork();

            // 局部变量
            int num = 10;

            // 判断当前进程是父进程 还是子进程
            if (pid > 0){			// 进程号 > 0，即为子进程的进程号，当前为父进程
                printf("I am parent process, pid: %d, ppid: %d\n", getpid(), getppid());

                printf("parent process num : %d\n", num);
                num += 10;
                printf("parent process num + 10 : %d\n", num);

            }
            else if (pid == 0){		// 进程号 == 0，表示当前为子进程
                printf("I am child process, pid: %d, ppid: %d\n", getpid(), getppid());

                printf("child process num : %d\n", num);
                num += 100;
                printf("child process num + 100 : %d\n", num);
            }



    }

};


#endif //INTERVIEW_ACCESS_FORK_H
