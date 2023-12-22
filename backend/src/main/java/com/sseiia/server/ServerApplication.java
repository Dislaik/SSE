package com.sseiia.server;

import com.sseiia.server.entity.*;
import com.sseiia.server.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class ServerApplication  implements CommandLineRunner {

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    TicketStatusRepository ticketStatusRepository;

    @Autowired
    TicketCategoryRepository ticketCategoryRepository;

    @Autowired
    TicketSubcategoryRepository ticketSubcategoryRepository;

    @Autowired
    LogTypeRepository logTypeRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    public static void main(String[] args) {
        SpringApplication.run(ServerApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

        if (userRepository.findAll().isEmpty()) {
            Role userRole = new Role("user");
            Role adminRole = new Role("admin");
            Role superAdminRole = new Role("superadmin");

            roleRepository.save(userRole);
            roleRepository.save(adminRole);
            roleRepository.save(superAdminRole);

            User user1 = new User("20349272", passwordEncoder.encode("2103"), "matias.salas@alu.ucm.cl", "Matias", "Salas", userRole);
            User user2 = new User("20349273", passwordEncoder.encode("2103"), "juan.kewek@alu.ucm.cl", "Juan", "Kewek", adminRole);
            User user3 = new User("20349274", passwordEncoder.encode("2103"), "antonio.luksic@alu.ucm.cl", "Antonio", "Luksic", superAdminRole);

            userRepository.save(user1);
            userRepository.save(user2);
            userRepository.save(user3);
        }


        if (ticketStatusRepository.findAll().isEmpty()) {
            TicketStatus ticketStatus1 = new TicketStatus("open");
            TicketStatus ticketStatus2 = new TicketStatus("closed");
            TicketStatus ticketStatus3 = new TicketStatus("solved");

            ticketStatusRepository.save(ticketStatus1);
            ticketStatusRepository.save(ticketStatus2);
            ticketStatusRepository.save(ticketStatus3);
        }

        if (ticketCategoryRepository.findAll().isEmpty()) {
            TicketCategory category1 = new TicketCategory("General");
            TicketCategory category2 = new TicketCategory("Departamento de finanzas");
            TicketCategory category3 = new TicketCategory("Plataforma UCM");
            TicketCategory category4 = new TicketCategory("Información");

            ticketCategoryRepository.save(category1);
            ticketCategoryRepository.save(category2);
            ticketCategoryRepository.save(category3);
            ticketCategoryRepository.save(category4);

            TicketSubcategory subcategory1_1 = new TicketSubcategory("General", category1);
            TicketSubcategory subcategory2_1 = new TicketSubcategory("Pagos atrasados", category2);
            TicketSubcategory subcategory2_2 = new TicketSubcategory("Consulta de cuotas", category2);
            TicketSubcategory subcategory3_1 = new TicketSubcategory("Soporte teams estudiantes", category3);
            TicketSubcategory subcategory3_2 = new TicketSubcategory("Acceso laboratorio virtual", category3);
            TicketSubcategory subcategory3_3 = new TicketSubcategory("Acceso al portal del estudiante", category3);
            TicketSubcategory subcategory4_1 = new TicketSubcategory("Consulta admision especial", category4);
            TicketSubcategory subcategory4_2 = new TicketSubcategory("Consulta toma de ramos", category4);
            TicketSubcategory subcategory4_3 = new TicketSubcategory("Consulta por suspension o renuncia", category4);
            TicketSubcategory subcategory4_4 = new TicketSubcategory("Dudas en proceso de obtención de título", category4);

            ticketSubcategoryRepository.save(subcategory1_1);
            ticketSubcategoryRepository.save(subcategory2_1);
            ticketSubcategoryRepository.save(subcategory2_2);
            ticketSubcategoryRepository.save(subcategory3_1);
            ticketSubcategoryRepository.save(subcategory3_2);
            ticketSubcategoryRepository.save(subcategory3_3);
            ticketSubcategoryRepository.save(subcategory4_1);
            ticketSubcategoryRepository.save(subcategory4_2);
            ticketSubcategoryRepository.save(subcategory4_3);
            ticketSubcategoryRepository.save(subcategory4_4);
        }

        if (logTypeRepository.findAll().isEmpty()) {
            LogType logType1 = new LogType("created");
            LogType logType2 = new LogType("updated");
            LogType logType3 = new LogType("deleted");

            logTypeRepository.save(logType1);
            logTypeRepository.save(logType2);
            logTypeRepository.save(logType3);
        }
    }

}
